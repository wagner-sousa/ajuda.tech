import os
from django.core.management import execute_from_command_line

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ajuda_tech.settings")


def main():
    execute_from_command_line(os.sys.argv)


if __name__ == "__main__":
    main()
