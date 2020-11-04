from rest_framework import serializers


from .models import Patient
from .models import Prescription

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id', 'image','first_name', 'last_name', 'address', 'date_of_birth', 'height', 'weight', 'gender',
         'food_allergies', 'medication_allergies', 'primary_doctor',
         'primary_doctor_telephone_number', 'language', 'is_bed_patient','needs_walking_device','walking_devices',
          'surgeries', )


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ('id', 'brand_name',
        'medication_name', 'directions', 'quantity', 'refills', 'pharmacy_number',
        'rx', 'prescriber', 'label_image')
