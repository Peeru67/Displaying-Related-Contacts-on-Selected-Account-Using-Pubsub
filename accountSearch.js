import { LightningElement, track } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountController.searchAccounts';
import pubsub from 'c/pubsub';

export default class AccountSearch extends LightningElement {
    @track accounts = [];
    @track searchKey = '';
    @track hideSearchSection = false;

    async handleSearch(event) {
        this.searchKey = event.target.value;
        console.log('search key:', this.searchKey); 
        try {
            const result = await searchAccounts({ searchKey: this.searchKey });
            console.log('search results:', result);
            this.accounts = result.length > 0 ? [...result] : [];
            // Always publish, even if no accounts are found
            setTimeout(()=>{
                pubsub.publish('accountSearchResults', [...this.accounts]); 
                console.log('Published accounts:',this.accounts);
            },0);
            
        } catch (error) {
            console.error('Error fetching accounts:', error);
            this.accounts = [];
            pubsub.publish('accountSearchResults', []); // Publish empty array to clear previous state
        }
    }
    connectedCallback() {
        pubsub.subscribe('next', () => {
            this.hideSearchSection = true; // Hide the search section on "Next"
        });
        pubsub.subscribe('back', () => {
            this.hideSearchSection = false; // Show the search section on "Back"
        });
    }
}

