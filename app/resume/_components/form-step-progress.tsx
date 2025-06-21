import { Fragment } from "react";

function Step(props: { step: number; title: string; active: boolean }) {
  const stepColor = props.active ? "text-white" : "text-gray-900";
  const bgColor = props.active ? "bg-blue-600" : "bg-gray-300";
  const titleColor = props.active ? "text-blue-600" : "text-gray-500";

  return (
    <div className="flex flex-col items-center gap-2 relative p-3">
      <div
        className={`size-12 rounded-full grid place-items-center ${bgColor} ${stepColor}`}
      >
        {props.step}
      </div>
      <div
        className={`absolute -bottom-3 text-xs font-medium ${titleColor} w-max`}
      >
        {props.title}
      </div>
    </div>
  );
}

const steps = [
  { stepNumber: 1, title: "Profile", active: true },
  { stepNumber: 2, title: "Job Description", active: false },
  { stepNumber: 3, title: "Resume", active: false },
];

export function StepProgress() {
  return (
    <div className="flex flex-row items-center justify-between p-4">
      {steps.map((step, index) => (
        <Fragment key={step.stepNumber}>
          <Step
            step={step.stepNumber}
            title={step.title}
            active={step.active}
          />
          {index < steps.length - 1 && (
            <div
              key={`line-${index}`}
              className={`flex-1 border-t border-gray-300`}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
