from rest_framework import serializers


from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id', 'image','first_name', 'last_name', 'date_of_birth', 'height', 'weight', 'gender',
         'food_allergies', 'medication_allergies', 'primary_doctor',
         'primary_doctor_telephone_number', 'language', 'is_bed_patient','needs_walking_device','walking_devices',
          'surgeries', )
