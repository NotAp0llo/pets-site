import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-pet',
  templateUrl: './cadastro-pet.component.html',
  styleUrls: ['./cadastro-pet.component.css']
})
export class CadastroPetComponent implements OnInit {
  cadastroForm: FormGroup;
  options: string[] = ['Cachorro', 'Gato', 'Coelho', 'Pássaro', 'Peixe', 'Cavalo'];
  racasPorAnimal: { [key: string]: string[] } = {
    Cachorro: ['Labrador', 'Poodle', 'Bulldog'],
    Gato: ['Siamês', 'Persa', 'Maine Coon'],
    Coelho: ['Angorá', 'Mini Lop', 'Lionhead'],
    Pássaro: ['Canário', 'Papagaio', 'Periquito'],
    Peixe: ['Betta', 'Guppy', 'Neon'],
    Cavalo: ['Árabe', 'Frísio', 'Mustangue']
  };

  filteredAnimals!: Observable<string[]>;
  filteredRacas!: Observable<string[]>;
  selectedAnimal: string | null = null;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nomePet: ['', Validators.required],
      animal: ['', Validators.required],
      raca: ['', Validators.required],
      idade: ['', Validators.required],
      sexo: ['', Validators.required],
      peso: ['', Validators.required],
      condicoes: ['']
    });
  }

  ngOnInit() {
    this.filteredAnimals = this.cadastroForm.get('animal')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAnimals(value ?? ''))
    );

    this.cadastroForm.get('animal')!.valueChanges.subscribe(value => {
      this.selectedAnimal = value;
      this._updateRacas(value);
    });
  }

  private _filterAnimals(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _updateRacas(animal: string) {
    const racas = this.racasPorAnimal[animal] || [];
    this.filteredRacas = of(racas).pipe(
      map(racas => racas.filter(raca => raca.toLowerCase().includes(this.cadastroForm.get('raca')!.value?.toLowerCase() ?? '')))
    );

    this.cadastroForm.get('raca')!.valueChanges.pipe(startWith('')).subscribe(value => {
      this.filteredRacas = of(racas).pipe(
        map(racas => racas.filter(raca => raca.toLowerCase().includes(value?.toLowerCase() ?? '')))
      );
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value); // Aqui você pode implementar a lógica para enviar os dados
    }
  }
}
