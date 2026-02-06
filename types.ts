
export interface Principle {
  id: string;
  title: string;
  summary: string;
  fullDescription: string;
  takeaway: string;
  icon: string;
  color: string;
  illustrationUrl: string; // The artistic concept image (e.g., listening.png)
  quoteStoneUrl: string;   // The image with the quote and text (e.g., listeningwithtext.png)
}

export interface AssessmentQuestion {
  id: number;
  text: string;
  trait: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum View {
  HOME = 'home',
  PRINCIPLES = 'principles',
  ASSESSMENT = 'assessment',
  COACH = 'coach',
  REFLECTION = 'reflection'
}
