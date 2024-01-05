import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import {SplitButtonModule} from 'primeng/splitbutton'
import { RolesService } from '../../../services/roles.service';
import {ToastModule } from 'primeng/toast'
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-roles',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TableModule, SplitButtonModule, ToastModule],
  templateUrl: './roles.component.html',
  providers: [
    MessageService
  ]
})
export default class RolesComponent implements OnInit {
  roles = signal<any[]>([]);
  selectedRoles= signal<any[]>([]);
  totalRecords = signal<number>(0);
  selectAll: boolean =false;
  loading:boolean = false;
  selectClickAccion = {};
  items: MenuItem[] = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
          this.onUpdate();
      }
    },
    { separator: true },
    {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
            this.onDelete();
        }
    }
  ]
  private messageService = inject( MessageService );

  constructor(private roleService: RolesService){}

  ngOnInit(): void {
    this.selectedRoles.set([]);
    this.roles.set([]);
    this.totalRecords.set(0)
    this.loading = true;
    //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' })
  }

  loadRoles(event: any): void {
    this.loading = true;
    this.roleService.getRoles({start:event.first, limit: event.rows })
    .subscribe(result => {
      this.loading = false;
        this.totalRecords.update(() => result.data.total);
          this.roles.set(result.data.data);
          const total = this.selectedRoles().length + result.data.data.length;
          if(this.selectAll &&  total <= result.data.total) {
            const newData: any[] = result.data.data;
            const resultado =[...this.selectedRoles(), ...newData]
            this.selectedRoles.set(resultado) 
  
          }
        })
        /*.subscribe((result) => {
          this.loading = false;
          this.totalRecords.update(() => result.data.total);
          this.roles.set(result.data.data);
          const total = this.selectedRoles().length + result.data.data.length;
          if(this.selectAll &&  total <= result.data.total) {
            const newData: any[] = result.data.data;
            const resultado =[...this.selectedRoles(), ...newData]
            this.selectedRoles.set(resultado) 
  
          }
      })*/
  }

  onSelectionChange(value: any = []):void {
    // console.log("onchange", value);

    // const selectRoles = this.selectedRoles();
    // selectRoles.push(value)

    // this.selectedRoles.update((res: any) => selectRoles)

    // this.selectAll.update(() =>  false);

    // console.log(this.selectedRoles())

    this.selectAll = value.length === this.totalRecords();
    this.selectedRoles.set(value);
    //this.roles.set(this.roles());
    //this.selectedRoles.set([])
    //this.selectAll = false;
    return
}

  onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
        this.selectedRoles.set(this.roles()) ;
        this.selectAll = true;
    } else {
        this.selectedRoles.set([]);
        this.selectAll = false;
    }
  }

  onActions(event: any) {
   this.selectClickAccion = event;
  }

  onUpdate() {
    console.log("Update", this.selectClickAccion)
  }

  onSave(event: any) {
    console.log('save',event)
  }

  onDelete() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' })
    console.log("Delete", this.selectClickAccion)
  }
}
