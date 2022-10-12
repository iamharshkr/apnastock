from django.db import models
from django.urls import reverse


class Stock(models.Model):
    Symbols = models.CharField(max_length=100)
    Name = models.CharField(max_length=300)
    created_on = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.Name

    def get_absolute_url(self):
        return reverse('blog_post_detail', args=[self.Symbols])

    class Meta:
        ordering = ['created_on']

        def __unicode__(self):
            return "{0} {1} {2} {3} {4}".format(
                self, self.Symbols, self.Name, self.created_on)
