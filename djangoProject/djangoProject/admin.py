from django.contrib import admin
from .models import Script, VirtualMachine


@admin.register(Script)
class ScriptAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'filename', )


@admin.register(VirtualMachine)
class VirtualMachineAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'ip_address', 'get_scripts')

    @admin.display(description='')
    def get_scripts(self, instance):
        return ',\n'.join(script.name for script in instance.scripts.all())