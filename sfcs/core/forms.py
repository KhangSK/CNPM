from django import forms

PAYMENT_CHOICE = (
    ('A', 'Member Account'),
    ('M', 'Momo'),
    ('P', 'Apple Pay'),
)

class CheckoutForm(forms.Form):
    payment_option = forms.ChoiceField(
        widget=forms.RadioSelect, choices=PAYMENT_CHOICE)