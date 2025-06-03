import { Component, OnInit } from '@angular/core';
import { EventService } from '../../app/services/event.service';
import { Event } from '../../Model/Event';
import { ControlModelType, EventType } from '../../Model/enums';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-event',
   standalone: true,
  imports: [
    CommonModule,         
    ReactiveFormsModule,  
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  selectedEvent: Event | null = null;
  isEditMode = false;

  newEvent: Event = {
    name: '',
    eventType: EventType.CHARACTERISTIC_EVENT,
    eventDate: new Date(),
    controlModelId: 0,
    controlModel: {
      id: 0,
      modelType: ControlModelType.PAC,
      description: '',
      isPrincipal: false,
      materials: [],
      characteristics: [],
      events: []
    },
    characteristics: [],
    id: 0
  };

  eventTypes = Object.values(EventType);
  eventForm!: FormGroup;


  constructor(private eventService: EventService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadEvents();
     this.initForm();
  }

initForm(): void {
  this.eventForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    eventType: [EventType.CHARACTERISTIC_EVENT, Validators.required],
    eventDate: [new Date().toISOString().substring(0, 10), Validators.required], // format yyyy-MM-dd pour <input type="date">
    controlModelId: [0, Validators.required]
  });
}

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }

  selectEvent(event: Event): void {
  this.selectedEvent = event;
  this.isEditMode = true;

  // Remplir le formulaire avec les données sélectionnées
this.eventForm.patchValue({
  id: event.id,
  name: event.name,
  eventType: event.eventType,
  eventDate: event.eventDate ? event.eventDate.toISOString().substring(0, 10) : '', // ✅ vérification
  controlModelId: event.controlModelId
});
}


  initNewEvent(): void {
    this.selectedEvent = null;
    this.newEvent = {
      id:0,
      name: '',
      eventType: EventType.CHARACTERISTIC_EVENT,
      eventDate: new Date(),     
       controlModelId: 0,
       controlModel: {
         id: 0,
         modelType: ControlModelType.PAC,
         description: '',
         isPrincipal: false,
         materials: [],
         characteristics: [],
         events: []
       },
      characteristics: []
    };
    this.isEditMode = false;
  }

  submitEventForm(): void {
 
  const formValue = this.eventForm.value;

  // Transformer eventDate string en Date (si besoin)
  formValue.eventDate = new Date(formValue.eventDate);
 console.log('aaaaaa')
  if (this.isEditMode && this.selectedEvent) {
    console.log('aaaaaa')
    // Mettre à jour l'événement
    this.eventService.updateEvent(formValue, formValue.id).subscribe(() => {
      this.loadEvents();
      this.isEditMode = false;
      this.selectedEvent = null;
      this.eventForm.reset();
      this.initForm();
    });
  } else {
    // Créer un nouvel événement
    this.eventService.createEvent(formValue).subscribe(() => {
      this.loadEvents();
      this.eventForm.reset();
      this.initForm();
    });
  }
}

cancelEventForm(): void {
  this.isEditMode = false;
  this.selectedEvent = null;
  this.eventForm.reset();
  this.initForm();
}


  createEvent(): void {
    this.eventService.createEvent(this.newEvent).subscribe(() => {
      this.loadEvents();
      this.initNewEvent();
    });
  }

  updateEvent(): void {
    if (this.selectedEvent && this.selectedEvent.id) {
      this.eventService.updateEvent(this.selectedEvent, this.selectedEvent.id).subscribe(() => {
        this.loadEvents();
        this.selectedEvent = null;
        this.isEditMode = false;
      });
    }
  }

  deleteEvent(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.loadEvents();
        if (this.selectedEvent?.id === id) {
          this.selectedEvent = null;
        }
      });
    }
  }

  addCharacteristic(eventId: number, characteristicId: number): void {
    this.eventService.addCharacteristicToEvent(eventId, characteristicId).subscribe(() => {
      this.refreshSelectedEvent(eventId);
    });
  }

  removeCharacteristic(eventId: number, characteristicId: number): void {
    this.eventService.removeCharacteristicFromEvent(eventId, characteristicId).subscribe(() => {
      this.refreshSelectedEvent(eventId);
    });
  }

  private refreshSelectedEvent(eventId: number): void {
    this.loadEvents();
    if (this.selectedEvent?.id === eventId) {
      this.eventService.getEventById(eventId).subscribe(event => {
        this.selectedEvent = event;
      });
    }
  }
}
