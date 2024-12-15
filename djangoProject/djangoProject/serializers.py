from rest_framework import serializers

from .models import VirtualMachine, Script


class ScriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Script
        fields = ('id', 'name', 'description', 'category')

    category = serializers.CharField(source='get_category_label')

    def get_category_label(self, instance):
        return instance.get_category_label()


class VirtualMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = VirtualMachine
        fields = ('id', 'name', 'scripts', 'ip_address')

    scripts = ScriptSerializer(read_only=True, many=True)
