from rest_framework import serializers


from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id', 'first_name', 'last_name', 'date_of_birth', 'height', 'weight', 'gender',
         'food_allergies', 'medication_allergies', 'primary_doctor',
         'primary_doctor_telephone_number', 'language', 'bed_patient', 'walking_devices',
         'able_to_walk_alone', 'surgeries', )
