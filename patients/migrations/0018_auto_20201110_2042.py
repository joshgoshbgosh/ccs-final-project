# Generated by Django 3.1.2 on 2020-11-10 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0017_dose'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dose',
            name='time',
        ),
        migrations.AddField(
            model_name='dose',
            name='datetime',
            field=models.DateTimeField(null=True),
        ),
    ]
