from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS = [
    'CORE',
]

TEMPLATES = [
    {
        'DIRS': [BASE_DIR / 'core' / 'templates'],
    }
]

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'core' / 'static']

DEBUG = True
ALLOWED_HOSTS = []
