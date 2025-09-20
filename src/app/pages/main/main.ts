import { Component } from '@angular/core';
import { ScoreBoard } from '../../components/score-board/score-board';
import { SideBar } from '../../components/side-bar/side-bar';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Body } from "../../components/body/body";


@Component({
  selector: 'app-main',
  imports: [ScoreBoard, SideBar, Header, Footer, Body],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
