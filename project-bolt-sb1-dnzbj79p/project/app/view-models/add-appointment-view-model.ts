import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export class AddAppointmentViewModel extends Observable {
    private _patientName: string = '';
    private _dob: Date = new Date();
    private _mobileNumber: string = '';
    private _reason: string = '';
    private _appointmentDate: Date = new Date();
    private _appointmentTime: Date = new Date();
    private _referredBy: string = '';
    private _errors: any = {};
    private _minDate: Date;

    constructor() {
        super();
        this._minDate = new Date();
        this.calculateAge();
    }

    get patientName(): string {
        return this._patientName;
    }

    set patientName(value: string) {
        if (this._patientName !== value) {
            this._patientName = value;
            this.notifyPropertyChange('patientName', value);
            this.validateField('patientName');
        }
    }

    get dob(): Date {
        return this._dob;
    }

    set dob(value: Date) {
        if (this._dob !== value) {
            this._dob = value;
            this.notifyPropertyChange('dob', value);
            this.calculateAge();
            this.validateField('dob');
        }
    }

    get age(): number {
        return this.calculateAge();
    }

    get mobileNumber(): string {
        return this._mobileNumber;
    }

    set mobileNumber(value: string) {
        if (this._mobileNumber !== value) {
            this._mobileNumber = value;
            this.notifyPropertyChange('mobileNumber', value);
            this.validateField('mobileNumber');
        }
    }

    get reason(): string {
        return this._reason;
    }

    set reason(value: string) {
        if (this._reason !== value) {
            this._reason = value;
            this.notifyPropertyChange('reason', value);
        }
    }

    get appointmentDate(): Date {
        return this._appointmentDate;
    }

    set appointmentDate(value: Date) {
        if (this._appointmentDate !== value) {
            this._appointmentDate = value;
            this.notifyPropertyChange('appointmentDate', value);
        }
    }

    get appointmentTime(): Date {
        return this._appointmentTime;
    }

    set appointmentTime(value: Date) {
        if (this._appointmentTime !== value) {
            this._appointmentTime = value;
            this.notifyPropertyChange('appointmentTime', value);
        }
    }

    get referredBy(): string {
        return this._referredBy;
    }

    set referredBy(value: string) {
        if (this._referredBy !== value) {
            this._referredBy = value;
            this.notifyPropertyChange('referredBy', value);
        }
    }

    get errors(): any {
        return this._errors;
    }

    get minDate(): Date {
        return this._minDate;
    }

    private calculateAge(): number {
        const today = new Date();
        const birthDate = new Date(this._dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        this.notifyPropertyChange('age', age);
        return age;
    }

    private validateField(fieldName: string): boolean {
        switch (fieldName) {
            case 'patientName':
                if (!this._patientName || this._patientName.trim() === '') {
                    this._errors.patientName = 'Patient name is required';
                    this.notifyPropertyChange('errors', this._errors);
                    return false;
                }
                break;
            case 'dob':
                if (!this._dob) {
                    this._errors.dob = 'Date of birth is required';
                    this.notifyPropertyChange('errors', this._errors);
                    return false;
                }
                break;
            case 'mobileNumber':
                if (!this._mobileNumber || this._mobileNumber.trim() === '') {
                    this._errors.mobileNumber = 'Mobile number is required';
                    this.notifyPropertyChange('errors', this._errors);
                    return false;
                }
                // Basic phone number validation
                if (!/^\d{10,15}$/.test(this._mobileNumber.trim())) {
                    this._errors.mobileNumber = 'Please enter a valid mobile number';
                    this.notifyPropertyChange('errors', this._errors);
                    return false;
                }
                break;
        }

        // Clear error if validation passes
        delete this._errors[fieldName];
        this.notifyPropertyChange('errors', this._errors);
        return true;
    }

    private validateForm(): boolean {
        let isValid = true;
        isValid = this.validateField('patientName') && isValid;
        isValid = this.validateField('dob') && isValid;
        isValid = this.validateField('mobileNumber') && isValid;
        return isValid;
    }

    onSubmit() {
        if (this.validateForm()) {
            const appointment = {
                id: Date.now().toString(),
                patientName: this._patientName,
                dob: this._dob,
                age: this.age,
                mobileNumber: this._mobileNumber,
                reason: this._reason,
                date: this._appointmentDate,
                time: this.formatTime(this._appointmentTime),
                referredBy: this._referredBy,
                status: 'scheduled'
            };

            // TODO: Save appointment
            console.log('New appointment:', appointment);
            
            // Navigate back to the appointments list
            Frame.topmost().goBack();
        }
    }

    private formatTime(date: Date): string {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
    }
}