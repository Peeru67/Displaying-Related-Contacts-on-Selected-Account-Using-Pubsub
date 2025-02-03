import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import pubsub from 'c/pubsub';

export default class AccountDetails extends LightningElement {
    @track showAccountDetails = true;
    @track showContactDetails = false;
    @track selectedAccountId = null;
    @track accounts = [];

    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Account Site', fieldName: 'Site' },
        { label: 'Phone', fieldName: 'Phone' },
        { label: 'Account Type', fieldName: 'Type' }
    ];

    connectedCallback() {
        pubsub.subscribe('accountSearchResults', (accounts) => {
            console.log('Event triggered:accountSearchResults');
            this.handleAccountSearchResults(accounts);
        });
    }
    
    handleAccountSearchResults(accounts) {
        console.log('received accounts in accountDetails:', accounts); // Log accounts
        this.accounts = accounts ? JSON.parse(JSON.stringify(accounts)):[]; // Ensure reactivity by creating a new array reference
        console.log('updated accounts in accountDetails:', this.accounts);
    }

    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        if (selectedRows.length > 0) {
            this.selectedAccountId = selectedRows[0].Id;
            console.log('Selected Account ID:', this.selectedAccountId); // Log selected accountId
        }
    }

    handleNext() {
        if (this.selectedAccountId) {
            this.showAccountDetails = false;
            this.showContactDetails = true;
    
            
            setTimeout(() => {
                pubsub.publish('next', this.selectedAccountId); 
                pubsub.publish('selectedAccountId', this.selectedAccountId); 
                console.log('Published selectedAccountId', this.selectedAccountId);
            }, 0); // Timeout ensures pubsub is called after DOM rendering
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Please select an account first.',
                    variant: 'error'
                })
            );
        }
    }

    handleBack() {
        this.showContactDetails = false;
        this.showAccountDetails = true;
        this.selectedAccountId = null; // Reset selectedAccountId when going back
        pubsub.publish('back'); // Notify parent to show the search section
    }
}