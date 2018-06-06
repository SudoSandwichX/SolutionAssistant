import React from "react";
import {
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";
import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
  CustomSelect,
  TabsWrappedLabel
} from "components";

class SolutionManagement extends React.Component {
  state = {
    action: "", // {Extract|Pack}
    zipfile: "", // <file path>
    folder: "", // <folder path>
    packageType: "", // {Unmanaged|Managed|Both}
    allowWrite: "", // {Yes|No}
    AllowDelete: "", // {Yes|No|Prompt}
    clobber: "",
    errorlevel: "", // {Yes|No|Prompt}
    map: "", // <file path>
    nologo: "",
    log: "", // <file path>
    sourceLoc: "", // <string>
    localize: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={4}>
            <RegularCard
              cardTitle="Solution"
              cardSubtitle="Select a solution to begin"
              content={
                <div>
                  <ItemGrid xs={12} sm={12}>
                    <CustomInput
                      labelText="Solution Name"
                      id="solution-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </ItemGrid>
                </div>
              }
              footer={<Button color="primary">Browse</Button>}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={12}>
            <TabsWrappedLabel tabs={tabs} />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

export default SolutionManagement;

const tabs = [
  { id: 1, title: "General", content: "General Tab!" },
  { id: 2, title: "Packager Settings", content: SettingsTab() }
];

function SettingsTab(props) {
  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={3}>
          <CustomSelect
            labelText="Action"
            inputProps={{
              id: "action-select"
            }}
            formControlProps={{
              fullWidth: true
            }}
            menuItems={[
              { value: "0", text: "" },
              { value: "1", text: "Extract" },
              { value: "2", text: "Pack" }
            ]}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={3}>
          <CustomSelect
            labelText="Package Type"
            inputProps={{
              id: "packageType-select"
            }}
            formControlProps={{
              fullWidth: true
            }}
            menuItems={[
              { value: "0", text: "" },
              { value: "1", text: "Unmanaged" },
              { value: "2", text: "Managed" },
              { value: "2", text: "Both" }
            ]}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={3}>
          <CustomInput
            labelText="Username"
            id="username"
            formControlProps={{
              fullWidth: true
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          <CustomInput
            labelText="Email address"
            id="email-address"
            formControlProps={{
              fullWidth: true
            }}
          />
        </ItemGrid>
      </Grid>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={6}>
          <CustomInput
            labelText="First Name"
            id="first-name"
            formControlProps={{
              fullWidth: true
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <CustomInput
            labelText="Last Name"
            id="last-name"
            formControlProps={{
              fullWidth: true
            }}
          />
        </ItemGrid>
      </Grid>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={4}>
          <CustomInput
            labelText="City"
            id="city"
            formControlProps={{
              fullWidth: true
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          <CustomInput
            labelText="Country"
            id="country"
            formControlProps={{
              fullWidth: true
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          <CustomInput
            labelText="Postal Code"
            id="postal-code"
            formControlProps={{
              fullWidth: true
            }}
          />
        </ItemGrid>
      </Grid>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
          <CustomInput
            labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
            id="about-me"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              multiline: true,
              rows: 5
            }}
          />
        </ItemGrid>
      </Grid>
    </div>
  );
}
