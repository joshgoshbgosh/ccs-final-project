from django.contrib.auth import get_user_model
from rest_framework import serializers


from . import models

User = get_user_model()

class DoseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Dose
        fields = '__all__'


class PrescriptionSerializer(serializers.ModelSerializer):
    doses = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = models.Prescription
        fields = fields = ('id', 'brand_name', 'medication_name', 'directions', 'quantity', 'refills', 'pharmacy_number', 'rx', 'prescriber', 'label_image', 'patient','take_as_needed','hourly_frequency', 'doses')


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Patient
        depth = 1
        fields = fields = ('id', 'image','first_name', 'last_name', 'address', 'date_of_birth', 'height', 'weight', 'gender', 'food_allergies', 'medication_allergies', 'primary_doctor', 'primary_doctor_telephone_number', 'language', 'is_bed_patient','needs_walking_device','walking_devices', 'surgeries', 'prescriptions','caregivers')


class CaregiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'patients')
