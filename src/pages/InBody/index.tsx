import { useEffect } from "react";
import { InBodyStore } from "../../stores/InBodyStore";
import { useUserStore } from "../../stores/UserStore";
interface labelTexts {
  type: string;
  labelText: string;
  id: string;
}
const labelTexts: labelTexts[] = [
  {
    type: "date",
    labelText: "Measure Date",
    id: "measureTime",
  },
  {
    type: "number",
    labelText: "inBody評分",
    id: "inBodyScore",
  },
  {
    type: "number",
    labelText: "身高 (cm)",
    id: "height",
  },
  {
    type: "number",
    labelText: "體重 (kg)",
    id: "weight",
  },
  {
    type: "number",
    labelText: "身體總水重 (kg)",
    id: "bodyWater",
  },
  {
    type: "number",
    labelText: "體脂肪重 (kg)",
    id: "bodyFat",
  },
  {
    type: "number",
    labelText: "蛋白質重 (kg)",
    id: "bodyProtein",
  },
  {
    type: "number",
    labelText: "礦物質重 (kg)",
    id: "bodyMineral",
  },
  {
    type: "number",
    labelText: "骨骼肌重 (kg)",
    id: "bodyMuscle",
  },
  {
    type: "number",
    labelText: "體重控制 (kg)",
    id: "controlWeight",
  },
  {
    type: "number",
    labelText: "脂肪控制 (kg)",
    id: "controlFat",
  },
  {
    type: "number",
    labelText: "肌肉控制 (kg)",
    id: "controlMuscle",
  },
];

export default function InBody() {
  const height = InBodyStore((state) => state.height);
  const weight = InBodyStore((state) => state.weight);
  const bodyFat = InBodyStore((state) => state.bodyFat);
  const getCurrentUserInfo = useUserStore((state) => state.getCurrentUserInfo);
  const addInBodyData = InBodyStore((state) => state.addInBodyData);
  const setInputNumberToState = InBodyStore(
    (state) => state.setInputNumberToState,
  );
  const calculateBMI = InBodyStore((state) => state.calculateBMI);

  const calculateFatRatio = InBodyStore((state) => state.calculateFatRatio);
  useEffect(() => {
    getCurrentUserInfo();
  }, []);
  return (
    <>
      <div>
        {labelTexts.map((obj) => (
          <div key={obj.id} className="col">
            <div className="form-outline">
              <input
                type={obj.type}
                id={obj.id}
                className="form-control"
                onChange={(e) => {
                  setInputNumberToState(
                    e.target.id,
                    obj.type === "number"
                      ? Number(e.target.value)
                      : new Date(e.target.value),
                  );
                }}
              />
              <label className="form-label" htmlFor={obj.labelText}>
                {obj.labelText}
              </label>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary btn-block mb-4"
          onClick={() => {
            addInBodyData();
          }}
        >
          Place order
        </button>
      </div>
      <h3>
        體脂率 (%) ={" "}
        {calculateFatRatio() === "NaN"
          ? "TBD"
          : ((100 * bodyFat) / weight).toFixed(2)}
      </h3>
      <h3>
        BMI (kg/m^2) =
        {calculateBMI() === "NaN"
          ? "TBD"
          : ((weight * 10000) / height / height).toFixed(2)}
        {/* {(
          dummyData.weight /
          (dummyData.height / 100) /
          (dummyData.height / 100)
        ).toFixed(2)} */}
      </h3>
    </>
  );
}
