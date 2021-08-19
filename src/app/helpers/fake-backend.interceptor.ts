import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

const usersKey = 'users-key';
let users = (JSON.parse(localStorage.getItem(usersKey) as any) || []);

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {

      switch (true) {
        case url.endsWith('/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/register') && method === 'POST':
          return register();
        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find((x: { username: any; password: any; }) => x.username === username && x.password === password);
      if (!user) return error('Usuário ou senha incorreto!');
      return ok({
        ...basicDetails(user),
        token: 'user-token'
      })
    }

    function register() {
      const user = body

      if (users.find((x: { username: any; }) => x.username === user.username)) {
        return error('Usuário "' + user.username + '" já existente!')
      }

      user.id = users.length ? Math.max(...users.map((x: { id: any; }) => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok();
    }

    function ok(body?: { token?: string; id: any; username: any; } | undefined) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError({ error: { message } })
        .pipe(materialize(), delay(500), dematerialize());
    }

    function basicDetails(user: { id: any; username: any; }) {
      const { id, username } = user;
      return { id, username };
    }

  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};