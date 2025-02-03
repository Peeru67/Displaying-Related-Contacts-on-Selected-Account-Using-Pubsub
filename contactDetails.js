import { LightningElement, track } from 'lwc';
import getRelatedContacts from '@salesforce/apex/ContactController.getRelatedContacts';
import pubsub from 'c/pubsub';

export default class ContactDetails extends LightningElement {
    @track accountId;
    @track contacts = [];
    @track loading = false; // Spinner control

    columns = [
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName' },
        { label: 'Email', fieldName: 'Email' },
        { label: 'Phone', fieldName: 'Phone' }
    ];

    connectedCallback() {
        pubsub.subscribe('selectedAccountId', this.handleAccountIdChange.bind(this));
    }

    get hasContacts() {
        return this.contacts.length > 0 && !this.loading; // Ensure no spinner is shown alongside contacts
    }

    
    get showNoContactsMessage() {
        return this.contacts.length === 0 && !this.loading && this.accountId; // Show only after loading finishes
    }
    


    async handleAccountIdChange(accountId) {
        this.accountId = accountId;
        console.log('Received accountId:', this.accountId);

        if (this.accountId) {
            this.loading = true; // Show spinner
            try {
                const result = await getRelatedContacts({ accountId: this.accountId });
                console.log('Fetched contacts:', JSON.stringify(result));
                this.contacts = Array.isArray(result) ? [...result] : [];
                console.log('Updated contacts array:', JSON.stringify(this.contacts));
            } catch (error) {
                console.error('Error fetching contacts:', error);
                this.contacts = [];
            } finally {
                this.loading = false; // Hide spinner
            }
        } else {
            this.contacts = [];
        }
    }
}