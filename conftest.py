import django
import os


def pytest_configure():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ajuda_tech.settings")
    django.setup()
