import {
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule
  } from "@angular/material";
  import { NgModule } from "@angular/core";
  
  @NgModule({
    imports: [
      MatButtonModule,
      MatInputModule,
      MatTabsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelectModule,
      MatRadioModule,
      MatCheckboxModule
    ],
    exports: [
      MatButtonModule,
      MatInputModule,
      MatTabsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelectModule,
      MatRadioModule,
      MatCheckboxModule
    ]
  })
  export class MaterialModule {}
