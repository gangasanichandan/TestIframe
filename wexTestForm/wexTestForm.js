import { LightningElement, track } from 'lwc';
import { CloseActionScreenEvent } from "lightning/actions";

export default class WexTestForm extends LightningElement {
    @track accountName;
    isIFrameReloaded = false;
    renderedCallback() {
        if (!this.isIFrameReloaded) {
            console.log('Start:renderedCallback:' + this.accountName);
            this.isIFrameReloaded = true;
            this.loadIFrame();
        }
    }
    //Actual component will load iframe after getting all pre-poluated values
    loadIFrame() {
        var path = this.fullUrl;
        if (!this.accountName) {
            this.accountName = 'test';
        }
        path = path.concat('&firstName=', this.accountName);
        console.log(':loadIFrame:' + path);
        const formContainer = this.template.querySelector('.wexFormContainer');
        const iframe = document.createElement('iframe');
        iframe.src = path;
        iframe.id= 'iframe-1';
        iframe.setAttribute('position', 'absolute');
        formContainer.appendChild(iframe);    
    }
    get fullUrl() {
        return 'https://stagefull-onlineservices.cs214.force.com/creditapplication/PartnerBOCAToProspect?partner=ryder';
    }
    handleNameChange(event) {
        this.accountName = event.detail.value;
    }
    cancel(event) {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    submit(event) {
        console.log('Start:Account Name:' + this.accountName);
    }
}