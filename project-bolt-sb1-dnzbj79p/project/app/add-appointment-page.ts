import { NavigatedData, Page, EventData } from '@nativescript/core';
import { AddAppointmentViewModel } from './view-models/add-appointment-view-model';

let viewModel: AddAppointmentViewModel;

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    
    if (!viewModel) {
        viewModel = new AddAppointmentViewModel();
    }
    
    page.bindingContext = viewModel;
}