public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(Id accountId) {
        System.debug('Fetching contacts for Account ID: ' + accountId);
        if (accountId == null) {
            return new List<Contact>();
        }
        List<Contact> contacts = [SELECT Id, FirstName, LastName, Email, Phone FROM Contact WHERE AccountId = :accountId];
        System.debug('Fetched contacts: ' + contacts);
        return contacts;
    }
}
