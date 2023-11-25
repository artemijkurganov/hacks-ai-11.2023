import pandas as pd
import warnings
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from catboost import CatBoostRegressor
import numpy as np
warnings.filterwarnings('ignore')
import os


# Данные о постройках по кварталам

columns = ['Название', 'Общая площадь объекта недвижимости, кв. м', 'Общая площадь здания кв. м', 'Занято службами Банка России',
           'Не занято (не используется)', 'Балансовая стоимость, руб.', 'Сумма начисленной амортизации, руб.',
           'Техническое состояние', 'Количество помещений']


def process_quartal_data(df):
    replace_ts = {'Удовлетворительное': 3,
             'Хорошее': 4,
             'Ветхое': 2,
             'Аварийное': 1}
    df = df.dropna(subset=[25])
    df[1] = df[1].fillna(method='ffill')
    object_counts = df[1].value_counts()
    df['Count'] = df[1].map(object_counts)
    df.dropna(inplace=True)
    df.drop([1], axis=1, inplace=True)
    df.columns = columns
    df.drop(['Название'], axis=1, inplace=True)
    df['Техническое состояние'] = df['Техническое состояние'].replace(replace_ts)
    return df

def get2020xls(index):
    return os.path.join('script', 'train_data', 'Lists_ON', 'List ON_2020', f'{index} quarter 2020.xls')

def get2021xls(index):
    return os.path.join('script', 'train_data', 'Lists_ON', 'List ON_2021', f'{index} quarter 2021.xls')



quartal_1_2020 = pd.read_excel(get2020xls(1), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_2_2020 = pd.read_excel(get2020xls(2), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_3_2020 = pd.read_excel(get2020xls(3), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_4_2020 = pd.read_excel(get2020xls(4), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)

quartal_1_2020 = process_quartal_data(quartal_1_2020)
quartal_2_2020 = process_quartal_data(quartal_2_2020)
quartal_3_2020 = process_quartal_data(quartal_3_2020)
quartal_4_2020 = process_quartal_data(quartal_4_2020)

quartal_1_2021 = pd.read_excel(get2021xls(1), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_2_2021 = pd.read_excel(get2021xls(2), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_3_2021 = pd.read_excel(get2021xls(3), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)
quartal_4_2021 = pd.read_excel(get2021xls(4), skiprows=8, parse_dates=[4]).drop([3, 4, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22, 24], axis=1)

quartal_1_2021 = process_quartal_data(quartal_1_2021)
quartal_2_2021 = process_quartal_data(quartal_2_2021)
quartal_3_2021 = process_quartal_data(quartal_3_2021)
quartal_4_2021 = process_quartal_data(quartal_4_2021)

# Данные о температуре

temperature_data = pd.read_excel(os.path.join("script", "temperature_data.xlsx"))
temperature_data.rename(columns={'Дата проведения': 'Месяц'}, inplace=True)

# Данные о платежах

def razmech(year):
    os.path.join("script", f"{year}_razmech.xlsx")

exp_2020 = pd.read_excel(razmech(2020), skiprows=9, parse_dates=['Дата проведения']).drop(['Unnamed: 0', 'Смета', 'Начальный остаток', 'Конечный остаток', 'Код статьи', 'Код вида расходов', 'Unnamed: 12'], axis=1)
exp_2021 = pd.read_excel(razmech(2021), skiprows=9, parse_dates=['Дата проведения']).drop(['Unnamed: 0', 'Смета', 'Начальный остаток', 'Конечный остаток', 'Код статьи', 'Код вида расходов', 'Направление расходов.1'], axis=1)

exp_2020_nona = exp_2020.dropna(subset=['Подразделение БР'])
exp_2020_nona['Месяц'] = exp_2020_nona['Дата проведения'].dt.month
exp_2020_nona.drop('Дата проведения', axis=1, inplace=True)
exp_2020_nona.dropna(inplace=True)

exp_2021_nona = exp_2021.dropna(subset=['Подразделение БР'])
exp_2021_nona['Месяц'] = exp_2021_nona['Дата проведения'].dt.month
exp_2021_nona.drop('Дата проведения', axis=1, inplace=True)
exp_2021_nona.dropna(inplace=True)

replacer = {
    'Расходы по оплате потребления электроэнергии': 'Электроэнергия',
    'Расходы по оплате всех видов отопления зданий и сооружений (кроме электро- и газового снабжения)': 'Отопление',
    'Расходы по оплате услуг водоснабжения, водоотведения': 'Водоснабжение',
    'Расходы на коммунальные услуги (расходы прошлых лет)': 'Коммунальные услуги (расходы прошлых лет)',
    'Расходы по оплате потребления газа': 'Газ',
    'Оплата потребления электроэнергии': 'Электроэнергия',
    'Оплата всех видов отопления зданий и сооружений (кроме электро- и газового снабжения)': 'Отопление',
    'Оплата услуг водоснабжения, водоотведения': 'Водоснабжение',
    'Оплата потребления газа': 'Газ'
}

exp_2020_nona['Наименование вида расходов'] = exp_2020_nona['Наименование вида расходов'].replace(replacer)
exp_2021_nona['Наименование вида расходов'] = exp_2021_nona['Наименование вида расходов'].replace(replacer)

exp_2020_nona = exp_2020_nona.merge(temperature_data, on=['Год сметы', 'Месяц', 'Город'], how='left')
exp_2020_nona.drop('Город', axis=1, inplace=True)
exp_2020_nona.dropna(inplace=True)

exp_2021_nona = exp_2021_nona.merge(temperature_data, on=['Год сметы', 'Месяц', 'Город'], how='left')
exp_2021_nona.drop('Город', axis=1, inplace=True)
exp_2021_nona.dropna(inplace=True)

# Разделение по кварталам

exp_2020_1q = exp_2020_nona[(exp_2020_nona['Месяц'] >= 1) & (exp_2020_nona['Месяц'] <= 3)]
exp_2020_2q = exp_2020_nona[(exp_2020_nona['Месяц'] >= 4) & (exp_2020_nona['Месяц'] <= 6)]
exp_2020_3q = exp_2020_nona[(exp_2020_nona['Месяц'] >= 7) & (exp_2020_nona['Месяц'] <= 9)]
exp_2020_4q = exp_2020_nona[(exp_2020_nona['Месяц'] >= 10) & (exp_2020_nona['Месяц'] <= 12)]

exp_2021_1q = exp_2021_nona[(exp_2021_nona['Месяц'] >= 1) & (exp_2021_nona['Месяц'] <= 3)]
exp_2021_2q = exp_2021_nona[(exp_2021_nona['Месяц'] >= 4) & (exp_2021_nona['Месяц'] <= 6)]
exp_2021_3q = exp_2021_nona[(exp_2021_nona['Месяц'] >= 7) & (exp_2021_nona['Месяц'] <= 9)]
exp_2021_4q = exp_2021_nona[(exp_2021_nona['Месяц'] >= 10) & (exp_2021_nona['Месяц'] <= 12)]

exp_list = [exp_2020_1q, exp_2020_2q, exp_2020_3q, exp_2020_4q,
           exp_2021_1q, exp_2021_2q, exp_2021_3q, exp_2021_4q]

quartals_list = [quartal_1_2020, quartal_2_2020, quartal_3_2020, quartal_4_2020,
               quartal_1_2021, quartal_2_2021, quartal_3_2021, quartal_4_2021]

for df, quartals_wo_name in zip(exp_list, quartals_list):
    for c in quartals_wo_name.columns:
        df[c] = [quartals_wo_name[c].mean() for _ in range(len(df))]

df = pd.concat(exp_list, ignore_index=True)
test_df = pd.read_csv('test_payments.csv')

combined_df = pd.concat([df, test_df], ignore_index=True)

label_encoder = LabelEncoder()
label_encoder1 = LabelEncoder()

combined_df['Подразделение БР'] = label_encoder.fit_transform(combined_df['Подразделение БР'])
combined_df['Наименование вида расходов'] = label_encoder1.fit_transform(combined_df['Наименование вида расходов'])

tfidf = TfidfVectorizer()
tfidf_encoded = tfidf.fit_transform(combined_df['Направление расходов'])

X_text = tfidf_encoded.toarray()
X_numeric = combined_df.drop(['Отнесено', 'Направление расходов'], axis=1).select_dtypes(include=np.number).values

X = np.concatenate([X_numeric, X_text], axis=1)

df_index = len(df)
test_df_index = len(test_df)
X_train = X[:df_index]
X_test = X[df_index:]

y = df['Отнесено']

scaler = StandardScaler()
scaler2 = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
y = scaler2.fit_transform(y.values.reshape(-1, 1))

X_train_numeric = X_train[:, :X_numeric.shape[1]]
X_test_numeric = X_test[:, :X_numeric.shape[1]]

X_train_combined = np.concatenate([X_train_numeric, X_text[:df_index]], axis=1)
X_test_combined = np.concatenate([X_test_numeric, X_text[df_index:]], axis=1)

model = CatBoostRegressor(border_count=64, depth=8, iterations=1000, l2_leaf_reg=5, learning_rate=0.1, verbose=False)

model.fit(X_train_combined, y)

y_pred = scaler2.inverse_transform(model.predict(X_test_combined).reshape(-1, 1))
print(np.abs(y_pred))

