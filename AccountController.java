public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchKey) {
        if (String.isBlank(searchKey)) {
            return new List<Account>();
        }
        String searchPattern = '%' + searchKey + '%';
        return [SELECT Id, Name, Site, Phone, Type
                FROM Account
                WHERE Name LIKE :searchPattern
                ORDER BY Name];
    }
}
