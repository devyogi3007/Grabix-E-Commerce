import React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&::before": {
    display: "none"
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  // "& .MuiAccordionSummary-content": {
  //   display: "flex",
  //   justifyContent: "space-around"
  // },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    // display: "none",
    transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    // display: "none"
    // transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
    // display: "flex",
    // justifyContent: "space-between"
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)"
  })
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: "1px solid rgba(0, 0, 0, .125)"
}));

const AccordionTable = ({ data: tableData = [], columns = [] }) => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  React.useEffect(() => {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (reloadCount < 2) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  }, []);

  return (
    <div>
      <div className="border rounded-xl border-black py-3 min-h-[60vh]">
        <div
          className={`grid grid-cols-${
            columns?.length || 0
          } gap-5 w-full px-14 py-2`}
        >
          {columns.map((item, index) => {
            if (item.field === "action") {
              return (
                <div>
                  <p className="font-bold w-full px-14">{item.headerName}</p>
                  {/* {data.map((data) => {
                  return <p>{data[item.field]}</p>;
                })} */}
                </div>
              );
            }
            return (
              <div>
                <p className="font-bold w-full ">{item.headerName}</p>
                {/* {data.map((data) => {
                  return <p>{data[item.field]}</p>;
                })} */}
              </div>
            );
          })}
        </div>
        <div className="h-full">
          {tableData?.length > 0 && (
            <>
              {tableData
                .filter((item) => item?.parentCategoryId === "0")
                .map((data) => {
                  return (
                    <Accordion
                      expanded={expanded === data.id}
                      onChange={handleChange(data.id)}
                    >
                      <AccordionSummary
                        aria-controls={`${data.id}-content`}
                        id={`${data.id}-header`}
                      >
                        <div
                          className={`grid grid-cols-${
                            columns?.length || 0
                          } gap-5 text-start w-full`}
                        >
                          {columns.map((item, index) => {
                            if (item.field === "action") {
                              return (
                                <div>
                                  {item.renderCell({
                                    row: data,
                                    route: "category"
                                  })}
                                </div>
                              );
                            }
                            return (
                              <div className="ps-1">
                                <p>{data[item.field]}</p>
                              </div>
                            );
                          })}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div
                          className={`grid grid-cols-${
                            columns?.length || 0
                          } text-start w-full border-black`}
                        >
                          {columns.map((item, index) => {
                            if (item.field === "action") {
                              return (
                                <>
                                  <div className="w-full">
                                    {tableData
                                      .filter(
                                        (subCategoryData) =>
                                          subCategoryData?.parentCategoryId ===
                                          data?.id
                                      )
                                      .map((dt) => (
                                        <p className="w-full border-b ps-14 border-black py-[.7rem]">
                                          {item.renderCell({
                                            row: dt,
                                            route: "sub-category"
                                          })}
                                        </p>
                                      ))}
                                  </div>
                                </>
                              );
                            }
                            return (
                              <div className="w-full ">
                                {tableData
                                  .filter(
                                    (subCategoryData) =>
                                      subCategoryData?.parentCategoryId ===
                                      data?.id
                                  )
                                  .map((subCategoryData, subCategoryIndex) => {
                                    // console.log(
                                    //   subCategoryData?.parentCategoryId ===
                                    //     data?.id
                                    // );
                                    if (
                                      subCategoryData?.parentCategoryId !==
                                      data?.id
                                    ) {
                                      return <p>No records found</p>;
                                    }
                                    return (
                                      <p
                                        className={`w-full border-b ps-14 border-black py-3`}
                                      >
                                        {subCategoryData[item.field]}
                                      </p>
                                    );
                                  })}
                              </div>
                            );
                          })}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
            </>
          )}
          {tableData?.length <= 0 && (
            <div className="h-[60vh] w-full flex justify-center items-center">
              <CircularProgress color="secondary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionTable;
