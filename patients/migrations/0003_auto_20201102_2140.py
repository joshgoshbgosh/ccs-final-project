# Generated by Django 3.1.2 on 2020-11-02 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0002_patient_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patient',
            old_name='name',
            new_name='first_name',
        ),
        migrations.AddField(
            model_name='patient',
            name='able_to_walk_alone',
            field=models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='No', max_length=225),
        ),
        migrations.AddField(
            model_name='patient',
            name='last_name',
            field=models.CharField(max_length=225, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='surgeries',
            field=models.TextField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='upload',
            field=models.ImageField(max_length=225, null=True, upload_to=''),
        ),
    ]
