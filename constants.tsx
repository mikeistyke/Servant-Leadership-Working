
import { Principle, AssessmentQuestion } from './types';

/**
 * Principles mapping using verified user assets.
 * Based on the latest input:
 * input_file_2.png = Latest Empathy Stone Artwork
 */
export const PRINCIPLES: Principle[] = [
  {
    id: 'p1',
    title: 'Listening',
    summary: 'Deep commitment to listening intently to others.',
    fullDescription: 'The servant leader seeks to identify the will of a group and helps to clarify that will. They listen receptively to what is being said and unsaid.',
    takeaway: 'Listening is not a passive act; it is a discipline of silence and attention.',
    icon: 'fa-ear-listen',
    color: 'bg-blue-100 text-blue-700',
    illustrationUrl: '/images/listening.png', 
    quoteStoneUrl: '/images/listeningtext.png'    
  },
  {
    id: 'p2',
    title: 'Empathy',
    summary: 'Striving to understand and empathize with others.',
    fullDescription: 'People need to be accepted and recognized for their special and unique spirits. One assumes the good intentions of co-workers and colleagues.',
    takeaway: 'Empathy requires suspending judgment to truly stand in another\'s shoes.',
    icon: 'fa-heart',
    color: 'bg-rose-100 text-rose-700',
    illustrationUrl: '/images/empathy.png', // Updated to latest asset
    quoteStoneUrl: '/images/empathytext.png'    // Updated to latest asset
  },
  {
    id: 'p3',
    title: 'Healing',
    summary: 'The potential for healing one\'s self and one\'s relationship to others.',
    fullDescription: 'Many people have broken spirits and have suffered from a variety of emotional hurts. Servant leaders recognize that they have an opportunity to help make whole those with whom they come in contact.',
    takeaway: 'Leadership is a restorative act; we mend the fabric of the team.',
    icon: 'fa-hand-holding-heart',
    color: 'bg-emerald-100 text-emerald-700',
    illustrationUrl: '/images/healing.png',
    quoteStoneUrl: '/images/healingtext.png'
  },
  {
    id: 'p4',
    title: 'Awareness',
    summary: 'General awareness, and especially self-awareness, strengthens the servant-leader.',
    fullDescription: 'Awareness aids one in understanding issues involving ethics, power, and values. It lends itself to being able to view most situations from a more integrated, holistic position.',
    takeaway: 'You cannot lead others until you clearly see yourself.',
    icon: 'fa-eye',
    color: 'bg-amber-100 text-amber-700',
    illustrationUrl: '/images/awareness.png',
    quoteStoneUrl: '/images/awarenesstext.png'
  },
  {
    id: 'p5',
    title: 'Persuasion',
    summary: 'Relying on persuasion rather than on one\'s positional authority.',
    fullDescription: 'The servant leader seeks to convince others rather than coerce compliance. This particular element offers one of the clearest distinctions between the traditional authoritarian model and that of servant leadership.',
    takeaway: 'Influence is earned through consensus, not commanded through rank.',
    icon: 'fa-comments',
    color: 'bg-indigo-100 text-indigo-700',
    illustrationUrl: '/images/persuasion.png',
    quoteStoneUrl: '/images/persuasiontext.png'
  },
  {
    id: 'p6',
    title: 'Conceptualization',
    summary: 'The ability to look at a problem or an organization from a conceptualizing perspective.',
    fullDescription: 'This means that one must think beyond day-to-day realities. Servant leaders nurture their abilities to dream great dreams.',
    takeaway: 'We must balance the granular details with the grand vision.',
    icon: 'fa-lightbulb',
    color: 'bg-purple-100 text-purple-700',
    illustrationUrl: '/images/conceptualization.png',
    quoteStoneUrl: '/images/conceptualizationtext.png'
  },
  {
    id: 'p7',
    title: 'Foresight',
    summary: 'The ability to foresee the likely outcome of a situation.',
    fullDescription: 'Foresight is a characteristic that enables the servant leader to understand the lessons from the past, the realities of the present, and the likely consequence of a decision for the future.',
    takeaway: 'Predicting the future is impossible; preparing for it is essential.',
    icon: 'fa-arrow-trend-up',
    color: 'bg-cyan-100 text-cyan-700',
    illustrationUrl: '/images/foresight.png',
    quoteStoneUrl: '/images/foresighttext.png'
  },
  {
    id: 'p8',
    title: 'Stewardship',
    summary: 'Holding institutions in trust for the greater good of society.',
    fullDescription: 'Servant leadership assumes that one is holding something in trust for another. It emphasizes the service to the needs of others.',
    takeaway: 'We do not own the team or the company; we are temporary caretakers.',
    icon: 'fa-shield-halved',
    color: 'bg-teal-100 text-teal-700',
    illustrationUrl: '/images/stewardship.png',
    quoteStoneUrl: '/images/stewardshiptext.png'
  },
  {
    id: 'p9',
    title: 'Commitment to the Growth of People',
    summary: 'Deeply committed to the growth of each and every individual.',
    fullDescription: 'The servant leader recognizes the tremendous responsibility to do everything in his or her power to nurture the personal and professional growth of employees.',
    takeaway: 'Success is measured by how much your team grows, not just the profits.',
    icon: 'fa-seedling',
    color: 'bg-green-100 text-green-700',
    illustrationUrl: '/images/commitment.png',
    quoteStoneUrl: '/images/commitmenttext.png'
  },
  {
    id: 'p10',
    title: 'Building Community',
    summary: 'Building community among those who work within a given institution.',
    fullDescription: 'Servant leadership suggests that true community can be created among those who work in businesses and other institutions.',
    takeaway: 'A team is a workforce; a community is a support system.',
    icon: 'fa-users',
    color: 'bg-orange-100 text-orange-700',
    illustrationUrl: '/images/building.png',
    quoteStoneUrl: '/images/buildingtext.png'
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  { id: 1, text: "I actively seek out the opinions of my team members before making a major decision.", trait: "p1" },
  { id: 2, text: "I try to understand the personal challenges my colleagues might be facing.", trait: "p2" },
  { id: 3, text: "I prioritize the professional development of my team over my own immediate milestones.", trait: "p9" },
  { id: 4, text: "I focus on reaching consensus through dialogue rather than giving direct orders.", trait: "p5" },
  { id: 5, text: "I feel a deep sense of responsibility for the long-term sustainability of my organization.", trait: "p8" },
  { id: 6, text: "I regularly reflect on my own strengths and weaknesses as a leader.", trait: "p4" },
  { id: 7, text: "I try to help resolve conflicts in a way that restores trust among team members.", trait: "p3" }
];
