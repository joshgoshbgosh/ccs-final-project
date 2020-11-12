from django.db import models
from django.conf import settings

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass

class Profile(models.Model):
    # https://docs.djangoproject.com/en/3.1/topics/db/examples/one_to_one/#one-to-one-relationships
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    phone_number = models.CharField(max_length=12, blank=True)

    def __str__(self):
        return self.user.username
