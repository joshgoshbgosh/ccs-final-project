# Generated by Django 3.1.3 on 2020-11-18 14:44

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('patients', '0020_auto_20201117_1754'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='caregiver',
            field=models.ManyToManyField(related_name='patients', to=settings.AUTH_USER_MODEL),
        ),
    ]
