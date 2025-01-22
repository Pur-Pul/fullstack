export interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

export interface CoursePartDescriptive extends CoursePartBase {
    description: string;
}

export interface CoursePartBasic extends CoursePartDescriptive {
    kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

export interface CoursePartBackground extends CoursePartDescriptive {
    backgroundMaterial: string;
    kind: "background"
}

export interface CoursePartSpecial extends CoursePartDescriptive {
    requirements: string[],
    kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;