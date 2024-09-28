import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Colaborador } from '../Models/colaborador';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Colaborador | null>;
  public currentUser$: Observable<Colaborador | null>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    let storedUser: string | null = null;

    // Verifica se está no ambiente do navegador
    if (isPlatformBrowser(this.platformId)) {
      storedUser = localStorage.getItem('currentUser');
    }

    this.currentUserSubject = new BehaviorSubject<Colaborador | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Define o usuário atual e armazena no localStorage
  setCurrentUser(user: Colaborador): void {
    this.currentUserSubject.next(user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  // Recupera o usuário atual
  getCurrentUser(): Colaborador | null {
    return this.currentUserSubject.value;
  }

  // Logout: remove o usuário atual
  logout(): void {
    this.currentUserSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }
}
