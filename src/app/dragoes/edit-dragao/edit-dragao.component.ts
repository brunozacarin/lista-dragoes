import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiDragoesService } from 'src/app/services/api-dragoes.service';

@Component({
  selector: 'app-edit-dragao',
  templateUrl: './edit-dragao.component.html',
  styleUrls: ['./edit-dragao.component.css']
})
export class EditDragaoComponent implements OnInit {
  dragaoId: any;
  isEdit = false;
  isNew = true;
  isView = false;
  dadosDragao: any;
  form = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    type: ['', Validators.required],
    createdAt: ['', Validators.required]
  });
  loading = false;
  submitted = false;
  config = { mode: 'yyyy-mm-dd hh:mm:ss.s', locale: 'pt-br' };
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private dragoesService: ApiDragoesService
  ) { }

  ngOnInit(): void {
    this.dragaoId = this.route.snapshot.params['id'];
    if (this.route.snapshot.url[0].path == 'view') {
      this.isView = true;
      this.isNew = false;
      this.isEdit = false;
      this.getDadosDragaoView(this.dragaoId);
    }
    if (this.dragaoId && !this.isView) {
      this.isEdit = true;
      this.isNew = false;
      this.isView = false;
      this.getDadosDragao(this.dragaoId);
    }
    console.log('Id', this.dragaoId);

  }

  get formControls() { return this.form.controls; }

  getDadosDragao(dragaoId: any) {
    this.dragoesService.getDragao(dragaoId).subscribe(dragao => {
      this.dadosDragao = dragao;
      this.formControls.id.setValue(dragaoId);
      this.formControls.name.setValue(this.dadosDragao.name);
      this.formControls.type.setValue(this.dadosDragao.type);
      this.formControls.createdAt.setValue(this.dadosDragao.createdAt);
    });
  }

  getDadosDragaoView(dragaoId: any) {
    this.dragoesService.getDragao(dragaoId).subscribe(dragao => {
      this.dadosDragao = dragao;
      this.formControls.name.setValue(this.dadosDragao.name);
      this.formControls.name.disable();
      this.formControls.type.setValue(this.dadosDragao.type);
      this.formControls.type.disable();
      this.formControls.createdAt.setValue(this.dadosDragao.createdAt);
      this.formControls.createdAt.disable();
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.addDragao();
  }

  private addDragao() {
    this.formatDate(this.formControls.createdAt.value);
    if (this.isNew) {
      this.dragoesService.addDragao(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            alert('Dragão Cadastrado com sucesso!')
            this.router.navigate(['/dragoes'], { relativeTo: this.route });
          },
          error: error => {
            console.log(error);
            alert(error.error.message)
            this.loading = false;
          }
        });
    }
    else {
      this.dragoesService.editDragao(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            alert('Dragão Editado com sucesso!')
            this.router.navigate(['/dragoes'], { relativeTo: this.route });
          },
          error: error => {
            console.log(error);
            alert(error.error.message)
            this.loading = false;
          }
        });
    }
  }

  formatDate(date: any) {
    if (date.length == 10) {
      let dia = date.substring(0, 2);
      let mes = date.substring(3, 5);
      let newDate = mes + '-' + dia + date.substring(5);
      this.form.value.createdAt = newDate;
    }
  }


}
