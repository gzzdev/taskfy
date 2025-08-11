import os
from django.core.wsgi import get_wsgi_application
<<<<<<< HEAD
# To push notifications?
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_wsgi_application()
=======

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
application = get_wsgi_application()
>>>>>>> a0773d6816c06dfd31c6c7231dd277ee3b93efdf
