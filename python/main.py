import argparse

import datetime
import qrcode

import barcode

from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.pagesizes import A4

from reportlab.lib import colors

barcode.base.Barcode.default_writer_options['write_text'] = False


def parse_command_line():
    parser = argparse.ArgumentParser('arguments', add_help=True)

    parser.add_argument('client', type=str)
    parser.add_argument('commande', type=str)
    parser.add_argument('montant', type=str)

    return parser.parse_args()


def main(client, commande, montant):
    canvas = Canvas('pdf.pdf', pagesize=A4)

    canvas.setFillColor(colors.beige)
    canvas.rect(72, A4[1] - 72 - 200, A4[0] - 72 - 72, 200, fill=1)
    canvas.setFillColorRGB(0, 0, 0)

    canvas.setFont("Helvetica", 30)
    canvas.drawString(74 + 100 + 20, A4[1] - 72 - 35, client)

    canvas.line(74 + 100, A4[1] - 72 - 200, 74 + 100, A4[1] - 72)
    canvas.line(74 + 100, A4[1] - 72 - 30 - 20, A4[0] - 72, A4[1] - 72 - 30 - 20)
    canvas.line(74 + 100, A4[1] - 72 - 150, A4[0] - 72, A4[1] - 72 - 150)
    canvas.line(74 + 300, A4[1] - 72 - 200, 74 + 300, A4[1] - 72 - 150)

    date = datetime.datetime.now()
    canvas.drawString(74 + 100 + 20, A4[1] - 72 - 185, date.strftime('%d / %m / %y'))

    canvas.drawString(74 + 300 + 20, A4[1] - 72 - 185, montant)
    canvas.drawString(74 + 100 + 20, A4[1] - 72 - 100, commande)

    qr = qrcode.QRCode(version=1, box_size=10, border=1)
    qr.add_data(client)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color='black', back_color='beige')
    canvas.drawInlineImage(qr_image, 73, A4[1] - 71 - 150, width=100, height=100)

    code39 = barcode.get('code39', commande, writer=barcode.writer.ImageWriter())
    barcode_image = code39.render({'background': 'beige'})

    canvas.drawInlineImage(barcode_image, 74 + 300 + 5, A4[1] - 72 - 100 - 37, width=A4[0] - 300 - 72 - 72 - 10,
                           height=75)

    canvas.save()
    return 0


if __name__ == '__main__':
    args = parse_command_line()
    main(args.client, args.commande, args.montant)
