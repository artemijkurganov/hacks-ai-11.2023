import pandas as pd
from sklearn.tree import DecisionTreeRegressor
from sklearn.preprocessing import LabelEncoder
import warnings
warnings.filterwarnings('ignore')
import os

def process_quartal_data(df):
    df = df.dropna(subset=[25])
    df[1] = df[1].fillna(method='ffill')
    object_counts = df[1].value_counts()
    df['Count'] = df[1].map(object_counts)
    df.dropna(inplace=True)
    df.drop([1], axis=1, inplace=True)
    return df

# columns = ['Название', 'Общая площадь объекта недвижимости, кв. м', 'Общая площадь здания кв. м', 'Занято службами Банка России',
#            'Не занято (не используется)', 'Балансовая стоимость, руб.', 'Сумма начисленной амортизации, руб.', 'Техническое состояние', 'Количество помещений']

columns = [str(i) for i in range(9)]
columns_test = ['1', '2', '3', '4', '5', '6', '7', '8']

def get2020xls(index):
    return os.path.join('script', 'train_data', 'Lists_ON', 'List ON_2020', f'{index} quarter 2020.xls')

def get2021xls(index):
    return os.path.join('script', 'train_data', 'Lists_ON', 'List ON_2021', f'{index} quarter 2021.xls')


quartal_1_2020 = pd.read_excel(get2020xls(1), skiprows=8, parse_dates=[0]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_2_2020 = pd.read_excel(get2020xls(2), skiprows=8, parse_dates=[0]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_3_2020 = pd.read_excel(get2020xls(3), skiprows=8, parse_dates=[0]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_4_2020 = pd.read_excel(get2020xls(4), skiprows=8, parse_dates=[0]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)


quartal_1_2020 = process_quartal_data(quartal_1_2020)
quartal_2_2020 = process_quartal_data(quartal_2_2020)
quartal_3_2020 = process_quartal_data(quartal_3_2020)
quartal_4_2020 = process_quartal_data(quartal_4_2020)

quartal_1_2020.columns = columns
quartal_2_2020.columns = columns
quartal_3_2020.columns = columns
quartal_4_2020.columns = columns

quartal_1_2021 = pd.read_excel(get2021xls(1), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_2_2021 = pd.read_excel(get2021xls(2), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_3_2021 = pd.read_excel(get2021xls(3), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_4_2021 = pd.read_excel(get2021xls(4), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)

quartal_1_2021 = process_quartal_data(quartal_1_2021)
quartal_2_2021 = process_quartal_data(quartal_2_2021)
quartal_3_2021 = process_quartal_data(quartal_3_2021)
quartal_4_2021 = process_quartal_data(quartal_4_2021)

quartal_1_2021.columns = columns
quartal_2_2021.columns = columns
quartal_3_2021.columns = columns
quartal_4_2021.columns = columns

df = pd.concat([quartal_1_2020, quartal_2_2020, quartal_3_2020, quartal_4_2020,
               quartal_1_2021, quartal_2_2021, quartal_3_2021, quartal_4_2021])

df.drop('0', axis=1, inplace=True)

label_encoder = LabelEncoder()
df['7'] = label_encoder.fit_transform(df['7'])

X, y = df.drop(['5'], axis=1), df['5']

model = DecisionTreeRegressor()
model.fit(X, y)

X_test = pd.read_csv('efficiency.csv')
X_test.columns = columns_test
X_test.drop('5', axis=1, inplace=True)
X_test['7'] = label_encoder.fit_transform(X_test['7'])

y_pred = model.predict(X_test)
print(y_pred / X_test['1'])
