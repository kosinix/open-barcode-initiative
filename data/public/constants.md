# Constants

## civilStatus

    [
        {
            _id: 'S',
            name: 'Single'
        },
        {
            _id: 'M',
            name: 'Married'
        },
        {
            _id: 'D',
            name: 'Divorced/Separated'
        },
        {
            _id: 'W',
            name: 'Widowed'
        }
    ]


## gender

    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 1,
            name: 'Female'
        },
        {
            _id: 2,
            name: 'Male'
        },
    ];




## idTypes
    [
        {
            _id: 'SSS',
            name: 'Social Security System'
        },
        {
            _id: 'GSIS',
            name: 'Government Service Insurance System'
        },
        {
            _id: 'TIN',
            name: 'Tax Identification Number'
        },
        {
            _id: 'UMID',
            name: 'Unified Multi-Purpose Card'
        },
        {
            _id: 'PP',
            name: 'Passport'
        },
        {
            _id: 'DL',
            name: 'Driver\'s License'
        },
        {
            _id: 'PRC',
            name: 'Professional Regulation Commission'
        },
        {
            _id: 'NBI',
            name: 'National Bureau of Investigation'
        }
    ]


## application.employmentType
    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 1,
            name: 'Employed'
        },
        {
            _id: 2,
            name: 'Self-Employed'
        },
    ];

## application.employment.status
    const EMPLOYMENT_STATUSES = [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 5,
            employmentType: 'E',
            name: 'Consultant'
        },
        {
            _id: 2,
            employmentType: 'E',
            name: 'Contractual'
        },
        {
            _id: 3,
            employmentType: 'E',
            name: 'Probationary/Trainee'
        },
        {
            _id: 4,
            employmentType: 'E',
            name: 'Project Hired (Project Based)'
        },
        {
            _id: 1,
            employmentType: 'E',
            name: 'Regular'
        },
        {
            _id: 6,
            employmentType: 'S',
            name: 'Freelancer'
        },
        {
            _id: 7,
            employmentType: 'S',
            name: 'Professional'
        }
    ];

## application.employment.industry
    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 1,
            name: 'Agriculture, Forestry and Fishing'
        },
        {
            _id: 2,
            name: 'Mining and Quarrying'
        },
        {
            _id: 3,
            name: 'Manufacturing of Chemicals/Plastics'
        },
        {
            _id: 4,
            name: 'Manufacturing of Garments'
        },
        {
            _id: 5,
            name: 'Manufacturing of Durable Consumer Goods (House)'
        },
        {
            _id: 6,
            name: 'Manufacturing of Consumer Products'
        },
        {
            _id: 7,
            name: 'Manufacturing Durable Goods (Industrial)'
        },
        {
            _id: 8,
            name: 'Electricity, Gas, Steam, and Airconditioning Supply'
        },
        {
            _id: 9,
            name: 'Water Supply; Sewerage, Waste Management, and Remediation Activities'
        },
        {
            _id: 10,
            name: 'Construction'
        },
        {
            _id: 11,
            name: 'Wholesale Trade'
        },
        {
            _id: 12,
            name: 'Retail Trade'
        },
        {
            _id: 13,
            name: 'Transportation and Storage'
        },
        {
            _id: 14,
            name: 'Hospitality/Hotels'
        },
        {
            _id: 15,
            name: 'Restaurants/Food and Beverages/Travel and Tourism'
        },
        {
            _id: 16,
            name: 'Information and Communication'
        },
        {
            _id: 17,
            name: 'Banking'
        },
        {
            _id: 18,
            name: 'Financial Services'
        },
        {
            _id: 19,
            name: 'Insurance'
        },
        {
            _id: 20,
            name: 'Real-Estate Activities'
        },
        {
            _id: 21,
            name: 'Professional, Scientific and Technical Activities'
        },
        {
            _id: 22,
            name: 'Administrative and Support Service Activities'
        },
        {
            _id: 23,
            name: 'Public Administration and Defense: Compulsary Social Security'
        },
        {
            _id: 24,
            name: 'Education'
        },
        {
            _id: 25,
            name: 'Human Health and Social Work Activities'
        },
        {
            _id: 26,
            name: 'Arts, Entertainment and Recreation'
        },
        {
            _id: 27,
            name: 'Other Service Activities'
        },
        {
            _id: 28,
            name: 'Activities of Households as Employers or For Own Use. Production of undifferentiated Goods and Services'
        },
        {
            _id: 29,
            name: 'Activities of Extra-Territorial Organizations and Bodies'
        },
        {
            _id: 30,
            name: 'Call Center/BPO (Business Process Outsourcing)'
        },
        {
            _id: 31,
            name: 'Energy'
        },
        {
            _id: 32,
            name: 'Government'
        },
        {
            _id: 33,
            name: 'Military'
        },
        {
            _id: 34,
            name: 'Printing/Publishing'
        },
        {
            _id: 35,
            name: 'Advertising'
        },
        {
            _id: 36,
            name: 'Automobile'
        },
        {
            _id: 37,
            name: 'Legal'
        },
        {
            _id: 38,
            name: 'Oil/Gas/Mining/Agriculture'
        },
        {
            _id: 39,
            name: 'General Manufacturing'
        },
        {
            _id: 40,
            name: 'General Utilities'
        },
        {
            _id: 41,
            name: 'General Trade'
        },
        {
            _id: 42,
            name: 'Banking/Financial Services'
        },
        {
            _id: 43,
            name: 'Social Services'
        },
        {
            _id: 99,
            name: 'Others'
        }
    ];

## application.employment.positionLevel
    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 4,
            name: 'Proprietor/Owner'
        },
        {
            _id: 3,
            name: 'Manager'
        },
        {
            _id: 2,
            name: 'Supervisor'
        },
        {
            _id: 1,
            name: 'Rank and File'
        },
        {
            _id: 5,
            name: "AVP/VP/CEO"
        }
    ];



## application.business.designation
    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 1,
            name: 'Proprietor'
        },
        {
            _id: 2,
            name: 'Partner'
        },
        {
            _id: 3,
            name: 'President'
        },
        {
            _id: 4,
            name: 'Chairman of the Board'
        }
    ];

## Business Loan application.purpose 
    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 1,
            name: 'Convert Receivables to Cash'
        },
        {
            _id: 2,
            name: 'Settle Payroll'
        },
        {
            _id: 3,
            name: 'Purchase Inventory'
        },
        {
            _id: 4,
            name: 'Purchase Equipments'
        },
        {
            _id: 5,
            name: 'Pay Suppliers'
        },
    ]

## Personal Loan application.purpose
    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 1,
            name: 'Personal Expenses'
        },
        {
            _id: 2,
            name: 'Tuition Fees'
        },
        {
            _id: 3,
            name: 'Home Improvements'
        },
        {
            _id: 4,
            name: 'Medical Fees'
        },
        {
            _id: 5,
            name: 'Bills Payments'
        },
        {
            _id: 6,
            name: 'Working Capital'
        }
    ];

## Seaman Loan application.purpose
    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 1,
            name: 'Tuition Fees / School Expenses'
        },
        {
            _id: 2,
            name: 'Business Capital/Expansion'
        },
        {
            _id: 3,
            name: 'Property Acquisition'
        },
        {
            _id: 4,
            name: 'Home Improvement/Repairs'
        },
        {
            _id: 5,
            name: 'Family Allowance'
        },
        {
            _id: 6,
            name: 'Others'
        }
    ];

## addressPresent.status and addressPermanent.status
    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 1,
            name: 'Rented'
        },
        {
            _id: 2,
            name: 'Owned'
        },
        {
            _id: 3,
            name: 'Mortgaged'
        },
        {
            _id: 4,
            name: 'Living with Relatives'
        },
        {
            _id: 5,
            name: 'Living with Parents'
        }
    ];


## cancelReasons
    [
        {
            _id: 0,
            name: 'Null'
        },
        {
            _id: 1,
            name: 'I changed my mind'
        },
        {
            _id: 2,
            name: "I do not have a co-borrower"
        },
        {
            _id: 3,
            name: "I cannot provide proof of income"
        },
        {
            _id: 4,
            name: "I do not have a checking account"
        },
        {
            _id: 5,
            name: "Others"
        },
    ]

## application.business.type
    [
        {
            _id: 1,
            name: 'Sole Proprietorship'
        },
        {
            _id: 2,
            name: 'Corporation'
        },
        {
            _id: 3,
            name: 'Partnership'
        }
    ];


## application.business.designation
    [
        {
            _id: 1,
            name: 'Proprietor'
        },
        {
            _id: 2,
            name: 'Partner'
        },
        {
            _id: 3,
            name: 'President'
        },
        {
            _id: 3,
            name: 'Chairman of the Board'
        }
    ];



## application.type
    [
        {
            _id: 0,
            name: 'All'
        },
        {
            _id: 1,
            name: 'Business'
        },
        {
            _id: 2,
            name: 'Personal'
        },
        {
            _id: 3,
            name: 'Seafarer'
        },
        {
            _id: 4,
            name: 'Corporate'
        }
    ]


## application.employment.incomeReceivingMethod.type

    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 1,
            name: 'Check'
        },
        {
            _id: 2,
            name: 'Voucher'
        },
        {
            _id: 3,
            name: 'Cash'
        },
        {
            _id: 4,
            name: 'Payroll ATM Account'
        }
    ];

## application.seafarerEmployment.salaryMethod
    [
        {
            _id: 0,
            name: 'Not Specified'
        },
        {
            _id: 1,
            name: 'Allotment'
        },
        {
            _id: 2,
            name: 'Shipboard'
        }
    ]

## application.status
    [
        {
            id: 10,
            key: "INCOMPLETE",
            name: 'Incomplete Application'
        },
        {
            id: 20,
            key: "PRE_DECLINED",
            name: 'Pre-declined'
        },
        {
            id: 30,
            key: "DECLINED",
            name: 'Declined'
        },
        {
            id: 40,
            key: "WITHDRAWN",
            name: 'Withdrawn'
        },
        {
            id: 50,
            key: "DELETED",
            name: 'Deleted' // Unused, use application.deleted flag instead
        },
        {
            id: 60,
            key: "REQUIREMENT_COMPLIANCE",
            name: 'Requirement Compliance'
        },
        {
            id: 70,
            key: "MANUAL_UNDERWRITING",
            name: 'Manual Underwriting'
        },
        {
            id: 80,
            key: "FOR_REVIEW",
            name: 'For Review'
        },
        {
            id: 90,
            key: "APPROVED",
            name: 'Approved'
        },
        {
            id: 100,
            key: "RELEASED",
            name: 'Released'
        }
    ]

### Order of processing
    
    INCOMPLETE: 10
    PRE_DECLINED: 20
    DECLINED: 30
    WITHDRAWN: 40
    DELETED: 50

    REQUIREMENT_COMPLIANCE: 60
    MANUAL_UNDERWRITING: 70
    FOR_REVIEW: 80

    APPROVED: 90
    RELEASED: 100



## application.business.permitType
    [
        {
            id: "dti",
            name: "DTI"
        },
        {
            id: "business",
            name: "Mayor or Business"
        },
        {
            id: "barangay",
            name: "Barangay"
        }
    ];



## application.requirements.primaryId.type
    [
        {
            id: "DL",
            name: "Driver's License",
        },
        {
            id: "PP",
            name: "Passport"
        },
        {
            id: "UMID",
            name: "Unified Multi-purpose ID"
        }
    ];

## application.requirements.secondaryId.type
    [
        {
            id: "NBI",
            name: "NBI Clearance"
        },
        {
            id: 'PC',
            name: 'Police Clearance'
        },
        {
            id: 'PID',
            name: 'Postal ID'
        },
        {
            id: "TIN",
            name: "TIN Card"
        }
    ];

## application.documents.proofOfBilling
    [
        {
            id: 1,
            name: "Recent proof of billing (electric bill, water bill, postpaid telco bill)"
        },
        {
            id: 2,
            name: "Credit card bill"
        },
        {
            id: 3,
            name: "Active Work or Residence Landline"
        },
        {
            id: 4,
            name: "Active GCash Account"
        },
        {
            id: 5,
            name: "Active PayMaya Account"
        },
        {
            id: 6,
            name: "Post-paid Telco Account (Non pre-paid SIM)"
        },
        {
            id: 0,
            name: "None"
        }
    ];

## application.references[n].relationship
## application.coBorrowers[n].relationship
    [
        {
            id: 'brother',
            degree: 1,
            name: 'Brother'
        },
        {
            id: 'colleague',
            degree: 2,
            name: 'Colleague'
        },
        {
            id: 'daughter',
            degree: 1,
            name: 'Daughter'
        },
        {
            id: 'father',
            degree: 1,
            name: 'Father'
        },
        {
            id: 'friend',
            degree: 2,
            name: 'Friend'
        },
        {
            id: 'granddaughter',
            degree: 1,
            name: 'Granddaughter'
        },
        {
            id: 'grandfather',
            degree: 1,
            name: 'Grandfather'
        },
        {
            id: 'grandmother',
            degree: 1,
            name: 'Grandmother'
        },
        {
            id: 'grandson',
            degree: 1,
            name: 'Grandson'
        },
        {
            id: 'husband',
            degree: 1,
            name: 'Husband'
        },
        {
            id: 'mother',
            degree: 1,
            name: 'Mother'
        },
        {
            id: 'sister',
            degree: 1,
            name: 'Sister'
        },
        {
            id: 'son',
            degree: 1,
            name: 'Son'
        },
        {
            id: 'wife',
            degree: 1,
            name: 'Wife'
        },
        {
            id: 'others',
            degree: 2,
            name: 'Others'
        },
    ]

## application.borrower.bank.name

Example:

`application.borrower.bank.name - AUB
application.borrower.bank.fullName - AUB Online/Cash Payment`

    [
        {
            id: "AUB",
            name: "AUB Online/Cash Payment"
        },
        {
            id: "BDO",
            name: "BDO Internet Banking"
        },
        {
            id: "BPI",
            name: "BPI ExpressOnline/Mobile (Fund Transfer)"
        },
        {
            id: "CBC",
            name: "Chinabank Online"
        },
        {
            id: "EWBX",
            name: "EastWest Online/Cash/Check Payment"
        },
        {
            id: "LBPA",
            name: "Landbank ATM Online"
        },
        {
            id: "MBTC",
            name: "Metrobankdirect"
        },
        {
            id: "PNBB",
            name: "PNB e-Banking Bills Payment"
        },
        {
            id: "RCBC",
            name: "RCBC Online Banking"
        },
        {
            id: "RSB",
            name: "RobinsonsBank Online Bills Payment"
        },
        {
            id: "SBCB",
            name: "Security Bank Cash Payment"
        },
        {
            id: "UBE",
            name: "Unionbank EON"
        },
        {
            id: "UBP",
            name: "Unionbank Internet Banking"
        },
        {
            id: "UCPB",
            name: "UCPB Connect"
        },
    ]


## application.documents[n].status
    [
        {
            key: '',
            name: 'Unverified'
        },
        {
            key: 'forged',
            name: 'Forged'
        },
        {
            key: 'invalid',
            name: 'Invalid'
        },
        {
            key: 'expired',
            name: 'Invalid - Expired'
        },
        {
            key: 'missing',
            name: 'Missing'
        },
        {
            key: 'unreadable',
            name: 'Unreadable'
        },
        {
            key: 'valid',
            name: 'Valid'
        }
    ]


## application.declineReason[n]
    [
        {
            value: 0,
            name: 'Unspecified'
        },
        {
            value: 10,
            name: 'Inconsistent address declaration'
        },
        {
            value: 20,
            name: 'Insufficient disposable monthly net income'
        },
        {
            value: 30,
            name: 'High Risk Credit'
        },
        {
            value: 40,
            name: 'Blacklisted Industry'
        },
        {
            value: 50,
            name: 'Forged Documents'
        },
        {
            value: 60,
            name: 'Others'
        }
    ]
