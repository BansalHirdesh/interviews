public with sharing class QuoteController {
    
    @AuraEnabled(cacheable = true)
    public static QuoteDto getData(Id recordId){
        try {
            Quote__c quoteObj = [SELECT Id, Name, StartDate__c, EndDate__c from Quote__c WHERE Id =: recordId][0];
            QuoteDto quoteWrapper = new QuoteDto(quoteObj);
            return quoteWrapper;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void saveData(QuoteDto quoteDtoObj){
        try {
            Quote__c quoteToUpdate = new Quote__c();
            quoteToUpdate.Id = quoteDtoObj.id;
            quoteToUpdate.startDate__c = quoteDtoObj.startDate;
            quoteToUpdate.endDate__c = quoteDtoObj.endDate;
            update quoteToUpdate;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}