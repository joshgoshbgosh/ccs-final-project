# Generated by Django 3.1.2 on 2020-11-04 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0011_patient_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prescription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=225)),
                ('last_name', models.CharField(max_length=225)),
                ('patient_address', models.CharField(max_length=225)),
                ('brand_name', models.CharField(max_length=225)),
                ('medication_name', models.CharField(max_length=225)),
                ('directions', models.CharField(max_length=225)),
                ('quantity', models.CharField(max_length=225)),
                ('refills', models.CharField(max_length=225)),
                ('pharmacy_number', models.CharField(max_length=225)),
                ('rx', models.CharField(max_length=225)),
                ('prescriber', models.CharField(max_length=225)),
                ('label_image', models.ImageField(null=True, upload_to='precription/')),
            ],
        ),
        migrations.AlterField(
            model_name='patient',
            name='walking_devices',
            field=models.CharField(blank=True, choices=[('Wheel_Chair', 'Wheel_Chair'), ('Walker', 'Walker'), ('Cane', 'Cane')], default=None, max_length=225, null=True),
        ),
    ]