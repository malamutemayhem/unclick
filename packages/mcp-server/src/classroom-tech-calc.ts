export type ClassroomTech = "smartboard" | "lms" | "student_response" | "virtual_lab" | "ai_tutor";

export function engagementBoost(c: ClassroomTech): number {
  const m: Record<ClassroomTech, number> = {
    smartboard: 6, lms: 5, student_response: 8, virtual_lab: 9, ai_tutor: 7,
  };
  return m[c];
}

export function implementationCost(c: ClassroomTech): number {
  const m: Record<ClassroomTech, number> = {
    smartboard: 7, lms: 5, student_response: 3, virtual_lab: 8, ai_tutor: 9,
  };
  return m[c];
}

export function trainingRequired(c: ClassroomTech): number {
  const m: Record<ClassroomTech, number> = {
    smartboard: 4, lms: 6, student_response: 2, virtual_lab: 7, ai_tutor: 5,
  };
  return m[c];
}

export function accessibilityScore(c: ClassroomTech): number {
  const m: Record<ClassroomTech, number> = {
    smartboard: 5, lms: 9, student_response: 7, virtual_lab: 6, ai_tutor: 10,
  };
  return m[c];
}

export function dataInsights(c: ClassroomTech): number {
  const m: Record<ClassroomTech, number> = {
    smartboard: 3, lms: 8, student_response: 9, virtual_lab: 6, ai_tutor: 10,
  };
  return m[c];
}

export function worksOffline(c: ClassroomTech): boolean {
  const m: Record<ClassroomTech, boolean> = {
    smartboard: true, lms: false, student_response: false, virtual_lab: false, ai_tutor: false,
  };
  return m[c];
}

export function personalized(c: ClassroomTech): boolean {
  const m: Record<ClassroomTech, boolean> = {
    smartboard: false, lms: true, student_response: false, virtual_lab: false, ai_tutor: true,
  };
  return m[c];
}

export function primaryBenefit(c: ClassroomTech): string {
  const m: Record<ClassroomTech, string> = {
    smartboard: "visual_presentation", lms: "content_management",
    student_response: "real_time_feedback", virtual_lab: "safe_experimentation",
    ai_tutor: "adaptive_learning",
  };
  return m[c];
}

export function deploymentModel(c: ClassroomTech): string {
  const m: Record<ClassroomTech, string> = {
    smartboard: "classroom_hardware", lms: "cloud_platform",
    student_response: "mobile_app", virtual_lab: "web_simulation",
    ai_tutor: "ai_service",
  };
  return m[c];
}

export function classroomTechs(): ClassroomTech[] {
  return ["smartboard", "lms", "student_response", "virtual_lab", "ai_tutor"];
}
