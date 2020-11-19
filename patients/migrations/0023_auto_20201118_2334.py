# Generated by Django 3.1.3 on 2020-11-18 23:34

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('patients', '0022_auto_20201118_1511'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='caregivers',
            field=models.ManyToManyField(blank=True, related_name='patients', to=settings.AUTH_USER_MODEL),
        ),
    ]
