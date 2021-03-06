import './ElementImpression.html';
import { Template } from 'meteor/templating';
import './ModalEditImpression.js';

Template.ElementImpression.onCreated(function () {
});

Template.ElementImpression.helpers({
	impressions: ()=> {
		return Impressions.find({}/*, {sort: { gabarit: 1 }}*/);  
	},
  	impressionsIndex: function () {
	    return ImpressionsIndex;   
	},
	resultsCount: function () {
      return ImpressionsIndex.getComponentDict().get('count');
    },
});

Template.ElementImpression.events({
	'click .toggle-editing': function () {
		Meteor.call('toggleEditImpression', this._id, this.editMode);
	},
	'click .supprimer': function () {
		Meteor.call('impressions.remove', this._id);
	},
	'submit .add-note'(event) {
        event.preventDefault();
        const target = event.target;
        const addNote = target.note.value;
        const impressionId = this._id;
        Meteor.call('impressions.note', impressionId, addNote);
    },
});
