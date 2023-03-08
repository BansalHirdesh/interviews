/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import getQuoteData from "@salesforce/apex/QuoteController.getData";
import saveQuoteData from "@salesforce/apex/QuoteController.saveData";
import { LightningElement, api, wire } from "lwc";

export default class EditQuote extends LightningElement {
  @api recordId;
  quoteData = {
    name: "Quote Name",
    startDate: 1547250828000,
    endDate: 1547250828000
  };
  quoteDataToSave = [];

  @wire(getQuoteData, {recordId : "$recordId"})
  wiredQuote({data, error}){
    if(data){
      console.log(JSON.stringify(data));
      this.quoteData = data;
    }
    else if(error){

    }
  }

  handleClick(event){
    let sDate = new Date(this.template.querySelector("lightning-input[data-id='startDate']").value);
    let eDate = new Date(this.template.querySelector("lightning-input[data-id='endDate']").value);
    console.log('quoteDataToSave');
    this.quoteDataToSave = this.quoteData;
    console.log(quoteDataToSave);
    quoteDataToSave.startDate = sDate;
    quoteDataToSave.endDate = eDate;
    quoteDataToSave = [...quoteDataToSave];
    saveQuoteData({quoteDtoObj : quoteDataToSave})
    .then();
  }

  renderedCallback() {}
}
