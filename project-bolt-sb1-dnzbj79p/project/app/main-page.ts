import { EventData, Page, NavigatedData, Frame } from '@nativescript/core';
import { AppointmentsViewModel } from './view-models/appointments-view-model';

let viewModel: AppointmentsViewModel;

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    
    if (!viewModel) {
        viewModel = new AppointmentsViewModel();
    }
    
    page.bindingContext = viewModel;
}

export function onAddAppointment() {
    Frame.topmost().navigate({
        moduleName: "add-appointment-page",
        transition: {
            name: "slide"
        }
    });
}