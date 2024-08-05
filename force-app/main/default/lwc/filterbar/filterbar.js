import { LightningElement } from 'lwc';
import getRecords from '@salesforce/apex/ListViewControllerData.fetchAccts';

export default class Filterbar extends LightningElement {

    filterClick() {
		if(this.showFilter) {
			this.showFilter = false;
			this.filterVariant = 'brand-outline';
			this.filterLabel = 'Show Filters (Not Fuctional for now)';
		} else {
			this.showFilter = true;
			this.filterVariant = 'brand';
			this.filterLabel = 'Hide Filters (Not Fuctional for now)';
		}
	}
}