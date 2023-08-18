import argparse
import os


def parse_command_line():
    parser = argparse.ArgumentParser('arguments', add_help=True)

    parser.add_argument('client', type=str)
    parser.add_argument('commande', type=str)
    parser.add_argument('montant', type=str)

    return parser.parse_args()

def main(client, commande, montant):
    with open("file.txt", 'w') as f:
        f.write("Hello There\n")
        f.write(client + "\n" + commande + "\n" + montant + "\n")

    return 0

if __name__ == '__main__':
    args = parse_command_line()
    main(args.client, args.commande, args.montant)