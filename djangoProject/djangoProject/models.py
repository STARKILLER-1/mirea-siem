from django.db import models


class VirtualMachine(models.Model):
    name = models.CharField(max_length=100)
    ip_address = models.CharField(max_length=100)
    ssh_username = models.CharField(max_length=100)
    ssh_password = models.CharField(max_length=100)

    scripts = models.ManyToManyField(to='Script')

    def __str__(self):
        return self.name


class ScriptCategory(models.TextChoices):
    NORMAL = 'normal', 'Обычные'
    NETWORK = 'network', 'Сетевые'
    SOFTWARE = 'software', 'ПО'
    SYSTEM = 'system', 'Системные'


class Script (models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    filename = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=ScriptCategory.choices, default=ScriptCategory.NORMAL)

    def get_category_label(self):
        return ScriptCategory(self.category).label

    def __str__(self):
        return f'{self.name} ({self.get_category_label()})'
