import { Component, OnInit } from '@angular/core';
import { ApiDragoesService } from '../services/api-dragoes.service';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './dragoes.component.html',
  styleUrls: ['./dragoes.component.css']
})
export class DragoesComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrash;
  viewIcon = faEye;
  public listaDragoes: Observable<any>;
  private _listaDragoes: BehaviorSubject<any>;
  listaDragoesOrdenada: any;
  constructor(
    private dragoesService: ApiDragoesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._listaDragoes = new BehaviorSubject<any>([]);
    this.listaDragoes = this._listaDragoes.asObservable();
  }

  ngOnInit(): void {
    this.dragoesService.listDragoes().subscribe(items => {
      this.listaDragoesOrdenada = (items as any).sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name))
      this._listaDragoes.next(this.listaDragoesOrdenada);
    })
  }

  editDragao(dragao?: any, view?: any) {
    if (view) {
      this.router.navigate(['view', dragao.id], { relativeTo: this.route })
    } else {
      dragao ? this.router.navigate(['edit', dragao.id], { relativeTo: this.route }) :
        this.router.navigate(['add'], { relativeTo: this.route });
    }
  }

  deleteDragao(dragao?: any) {
    this.dragoesService.deleteDragao(dragao.id)
      .pipe(first())
      .subscribe({
        next: () => {
          alert('Dragão Excluido com sucesso!')
          const listaNovaDragoes = this.listaDragoesOrdenada.filter((item: { id: any; }) => item.id != dragao.id);
          this._listaDragoes.next(listaNovaDragoes);
        },
        error: error => {
          console.log(error);
          alert(error.error.message)
        }
      });
  }

}
